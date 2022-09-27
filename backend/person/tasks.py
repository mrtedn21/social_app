import celery


@celery.shared_task
def test_task() -> None:
    with open('/home/kek.txt', 'a') as w:
        w.write('hellow world\n')
        