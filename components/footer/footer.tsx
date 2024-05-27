import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="footer__background-top">
        <Image
          src="/nubes.png"
          alt="fondo de nubes"
          width={1920}
          height={215}
        />
      </div>
      <div className="footer__container">
        <div className="container__row footer__flex">
          <div className="footer__col">
            <div className="footer__item">
              <h5>Accesos rápidos</h5>
              <ul className="footer__list">
                <li className="footer__listitem">
                  <Link href="./">Inicio</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="./aboutus.html">Nosotros</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="./contact.html">Contacto</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__item">
              <h5>Ayuda</h5>
              <ul className="footer__list">
                <li className="footer__listitem">
                  <Link href="#">Preguntas frecuentes</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="#">Privacidad</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="#">Términos y condiciones</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__item">
              <h5>Redes sociales</h5>
              <ul className="footer__list">
                <li className="footer__listitem">
                  <Link href="https://www.instagram.com">Instagram</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="https://www.youtube.com">Youtube</Link>
                </li>
                <li className="footer__listitem">
                  <Link href="https://www.facebook.com">Facebook</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__item">
              <h5>Contacto</h5>
              <ul className="footer__list">
                <li className="footer__listitem">
                  Avenida De Las Estrellas 1234
                </li>
                <li className="footer__listitem">Tel (303) 456-789-000</li>
                <li className="footer__listitem">
                  <Link href="mailto:info@jugueteriacosmica.com">
                    info@jugueteriacosmica.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
