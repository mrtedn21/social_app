import React from 'react';
import Container from "./Container";
import withRouter from "./WithRouter";
import {customFetchGet, customFetchPost} from "./utils/customFetch";
import Cookies from "js-cookie";
import './utils/Outline.css'


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.text_input_handle = this.text_input_handle.bind(this)
        this.text_key_pressed =this.text_key_pressed.bind(this)
        this.set_chat =this.set_chat.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
        this.display_chat_name = this.display_chat_name.bind(this)

        this.messages_list_container = React.createRef()
        this.state = {
            chats: undefined,
            selected_chat_id: undefined,
            messages: undefined,
            new_message_text: undefined,
        }
    }

    search_direct_chat_from_link(chat, direct_person_pk) {
        if (chat.type !== 'direct') {
            return false
        }
        if ((chat.first_person.pk == direct_person_pk) || (chat.second_person.pk == direct_person_pk)) {
            return true
        }
    }

    async componentDidMount() {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        await customFetchGet({
            url: 'http://localhost:8000/api/chats/',
            callback_with_data: async data => {
                let results = data.results
                const first_id = results[0].pk

                const direct_chats_from_link = results.filter(chat => this.search_direct_chat_from_link(chat, params.direct_person_pk))
                let direct_chat_pk_from_link = undefined
                if ((direct_chats_from_link) && (direct_chats_from_link[0])) {
                    direct_chat_pk_from_link = direct_chats_from_link[0].pk
                    await this.set_chat(direct_chat_pk_from_link)
                } else {
                    if (params.direct_person_pk) {
                        await customFetchGet({
                            url: 'http://localhost:8000/api/persons/' + params.direct_person_pk,
                            callback_with_data: async data => {
                                results.splice(0, 0, {
                                    pk: 0,
                                    type: "direct",
                                    first_person: {
                                        pk: Cookies.get('person_pk'),
                                    },
                                    second_person: {
                                        pk: data.pk,
                                        avatar_thumbnail: data.avatar_thumbnail,
                                        first_name: data.first_name,
                                        last_name: data.last_name,
                                    }
                                })
                            }
                        })
                        await this.set_chat(0)
                    } else {
                        await this.set_chat(this.props.params.pk || first_id)
                    }
                }
                this.setState({chats: results})
            },
        })
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.scrollToBottom()
    }

    scrollToBottom() {
        const messages_list = this.messages_list_container.current
        if (messages_list) {
            messages_list.scrollTop = messages_list.scrollHeight
        }
    }

    async set_chat(chat_id) {
        if (chat_id !== 0) {
            await customFetchGet({
                url: 'http://localhost:8000/api/messages/?chat_id=' + chat_id.toString(),
                callback_with_data: data => this.setState({messages: data.results}),
            })
        }

        this.setState({selected_chat_id: chat_id})
        window.history.replaceState(null, 'React App', '/chat/' + chat_id.toString())
    }

    text_input_handle(event) {
        this.setState({new_message_text: event.target.value})
    }

    async text_key_pressed(event) {
        if (event.key === 'Enter') {
            if (event.ctrlKey) {
                const old_value = event.target.value
                const new_value = old_value + '\n'

                event.target.value = new_value
                this.setState({new_message_text: new_value})
            }
            else {
                event.preventDefault()
                let formData = new FormData()
                formData.append('text', this.state.new_message_text)
                if (this.state.selected_chat_id !== 0) {
                    formData.append('chat', this.state.selected_chat_id)
                } else {
                    let chats = this.state.chats.filter(chat => chat.pk == this.state.selected_chat_id)
                    formData.append('target_person', chats[0].second_person.pk)
                }

                await customFetchPost({
                    url: 'http://localhost:8000/api/messages/',
                    callback_with_data: data => window.location.reload(),
                    body: formData,
                })
            }
        }
    }

    display_chat_name(chat) {
        if (chat.type === 'group') {
            return chat.name
        }
        if (chat.first_person.pk == Cookies.get('person_pk')) {
            return chat.second_person.last_name + ' ' + chat.second_person.first_name
        }
        if (chat.second_person.pk == Cookies.get('person_pk')) {
            return chat.first_person.last_name + ' ' + chat.first_person.first_name
        }
    }

    display_thumbnail(chat) {
        if (chat.type === 'group') {
            return ''
        }
        if (chat.first_person.pk == Cookies.get('person_pk')) {
            return chat.second_person.avatar_thumbnail
        }
        if (chat.second_person.pk == Cookies.get('person_pk')) {
            return chat.first_person.avatar_thumbnail
        }
    }

    render() {
        if (this.state.chats === undefined) {
            return null
        }

        const chats = this.state.chats.map(chat => (
            <div className="card" id="chat1" style={{
                borderRadius: '15px',
                marginBottom: '10px',
                backgroundColor: chat.pk == this.state.selected_chat_id ? '#e6efff' : 'white'
            }}>
                <div className="card-body" style={{padding: '12px'}}>
                    <div style={{display: 'flex'}}>
                        <img height="60px" style={{display: 'inline-block'}} className="rounded" src={this.display_thumbnail(chat)} alt=""/>
                        <div style={{marginLeft: '9px'}}>
                            <p style={{marginBottom: '5px', fontWeight: '500', cursor: 'pointer'}} onClick={async () => this.set_chat(chat.pk)}>{this.display_chat_name(chat)}</p>
                            <p style={{marginBottom: '5px', fontWeight: '300'}}>{chat.last_message?.text.slice(0, 20)}...</p>
                        </div>
                    </div>
                </div>
            </div>
            )
        )

        let messages = []
        if (this.state.messages) {
            messages = this.state.messages.map(message => {
                const is_owner = message.created_by == Cookies.get('person_pk')
                return (
                    <div className={'d-flex flex-row mb-2 justify-content-' + (is_owner ? 'end': 'start')}>
                        <div className="p-3" style={{borderRadius: '15px', backgroundColor: (is_owner ? '#f6f6f6' : '#f0f2ff')}} >
                            <p className="small mb-0">{message.text}</p>
                        </div>
                    </div>
                )
            })
        }

        return (
            <Container>
                <class className="row" style={{paddingTop: '20px'}}>
                    <div className="col-1"></div>
                    <div className="col-3">
                        {chats}
                    </div>
                    <div className="col-7">
                        <div className="card" id="chat1" style={{borderRadius: '15px'}}>
                            <div className="card-body">
                                <div ref={this.messages_list_container} style={{height: '600px', overflow: 'auto', marginBottom: '10px'}}>
                                    {messages}
                                </div>
                                <div className="form-outline">
                                    <textarea autoFocus={true} className="form-control without_outline" id="textAreaExample"
                                              rows="2" onInput={this.text_input_handle} onKeyPress={this.text_key_pressed}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </class>
            </Container>
        )
    }
}

export default withRouter(Chat);
