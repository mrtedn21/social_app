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
        this.messages_list_container = React.createRef()

        this.state = {
            chats: undefined,
            selected_chat_id: undefined,
            messages: undefined,
            new_message_text: undefined,
        }
    }

    async componentDidMount() {
        await customFetchGet({
            url: 'http://localhost:8000/api/chats/',
            callback_with_data: async data => {
                const selected_id = data.results[0].pk
                this.setState({chats: data.results})
                await this.set_chat(selected_id)
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
        await customFetchGet({
            url: 'http://localhost:8000/api/messages/?chat_id=' + chat_id.toString(),
            callback_with_data: data => this.setState({messages: data.results}),
        })
        this.setState({selected_chat_id: chat_id})
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
                formData.append('chat', this.state.selected_chat_id)

                await customFetchPost({
                    url: 'http://localhost:8000/api/messages/',
                    callback_with_data: data => window.location.reload(),
                    body: formData,
                })
            }
        }
    }

    render() {
        if ((this.state.chats === undefined) || (this.state.messages === undefined)) {
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
                        <img height="60px" style={{display: 'inline-block'}} className="rounded" src="https://social-bucket-mrtedn.storage.yandexcloud.net/social-bucket-mrtedn/CACHE/images/person_avatars/oslo/dabb3f2f563b7dd09dbf9bbce09fb982.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJENz7a58AelGO9p87eZn75%2F20230425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T052828Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ba49b224f975c9fe199a16ed8d0fe08735a7b4b1d44fb3894fbc08cd63e5030f" alt=""/>
                        <div style={{marginLeft: '9px'}}>
                            <p style={{marginBottom: '5px', fontWeight: '500', cursor: 'pointer'}} onClick={async () => this.set_chat(chat.pk)}>{chat.name}</p>
                            <p style={{marginBottom: '5px', fontWeight: '300'}}>{chat.last_message.text}</p>
                        </div>
                    </div>
                </div>
            </div>
            )
        )

        const messages = this.state.messages.map(message => {
            const is_owner = message.created_by == Cookies.get('user_pk')
            return (
                <div className={'d-flex flex-row mb-2 justify-content-' + (is_owner ? 'end': 'start')}>
                    <div className="p-3" style={{borderRadius: '15px', backgroundColor: (is_owner ? '#f6f6f6' : '#f0f2ff')}} >
                        <p className="small mb-0">{message.text}</p>
                    </div>
                </div>
            )
        })

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
