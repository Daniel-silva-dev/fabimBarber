
import "../componentsStyle/footer.css";
import { FaWhatsapp, FaInstagram, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        © {new Date().getFullYear()} Fábim Barber
      </div>

      <div className="footer-links">
        <a
          href="https://wa.me/5584987411833"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://www.instagram.com/fabim_barbearia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <Link
          to="/admin"
          aria-label="Painel Admin"
          className="footer-admin"
        >
          <FaUserShield />
        </Link>
      </div>
    </footer>
  );
}
