import styles from './login.module.css';
import LoginForm from '../_component/login/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
