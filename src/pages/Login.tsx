import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/ui/button'
import { Header } from '../components/ui/header'
import { Input } from '../components/ui/input'

export const Login = () => {
    const [fio1, setFio1] = useState('')
    const [fio2, setFio2] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        if (fio1.trim() && fio2.trim()) {
            sessionStorage.setItem('fio1', fio1)
            sessionStorage.setItem('fio2', fio2)
            navigate('/')
        }
    }

    return (
        <>
            <Header hideControls={true} />

            <div className="flex h-full w-full flex-col items-center justify-center gap-3 self-center p-4">
                <Input
                    className="w-full"
                    label="ФИО 1"
                    value={fio1}
                    onChange={(e) => setFio1(e.target.value)}
                />
                <Input
                    className="w-full"
                    label="ФИО 2"
                    value={fio2}
                    onChange={(e) => setFio2(e.target.value)}
                />

                <Button className="mt-5 w-full" onClick={handleLogin}>
                    Войти
                </Button>
            </div>
        </>
    )
}
