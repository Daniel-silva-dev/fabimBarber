import "../componentsStyle/footer.css";
import { FaWhatsapp, FaInstagram, FaUserShield } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        © {new Date().getFullYear()} Fábim Barber
      </div>

      <div className="footer-links">
        <a
          href="https://wa.me/5584999999999"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://instagram.com/fabimbarber"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="/admin"
          aria-label="Painel Admin"
          className="footer-admin"
        >
          <FaUserShield />
        </a>
      </div>
    </footer>
  );
}
