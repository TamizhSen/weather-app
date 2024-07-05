import logoImg from "../assets/logo.jpg";
export default function Header() {
  return (
    <header>
      <img src={logoImg} alt = 'Weather Logo' />
      <h1> Weather Forecast</h1>
    </header>
  );
}
