import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© at 2025</p>
        <div style={styles.iconContainer}>
          <a
            href="https://www.linkedin.com/in/mighty-akuneme/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
          >
            <FaLinkedin size={24} color="#0e76a8" />
          </a>
          <a
            href="https://x.com/m_akuneme"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconLink}
          >
            <FaTwitter size={24} color="#1DA1F2" />
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    padding: "20px 0",
    color: "#fff",
    textAlign: "center",
    marginTop: "20px",
  },
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    margin: "0 0 10px",
    fontSize: "1rem",
  },
  iconContainer: {
    display: "flex",
    gap: "15px",
  },
  iconLink: {
    color: "inherit",
    textDecoration: "none",
  },
};

export default Footer;