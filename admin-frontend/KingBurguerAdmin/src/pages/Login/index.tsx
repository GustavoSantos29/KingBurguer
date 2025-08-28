import { LogoLogin } from "../../assets/Logo/LogoLogin";
import InputText from "../../components/Inputs/Text";
import "./style.css";
import { Email } from "../../assets/misc/Email";
import { Lock } from "../../assets/misc/Lock";
import Button from "../../components/Buttons";

export default function LoginPage() {
  return (
    <div className="login-container">
      <LogoLogin />
      <InputText id="1" label="email" svg={<Email />} />
      <InputText id="2" label="email" svg={<Lock />} />
      <Button size="large" children="Entrar" />
    </div>
  );
}
