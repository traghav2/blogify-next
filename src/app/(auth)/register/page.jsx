import styles from './register.module.css'
import RegisterForm from '../_component/register/RegisterForm'
const RegisterPage = () => {
    return (
        <div className={styles.container}>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage