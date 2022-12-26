import { Row, Col } from "reactstrap";

const texts = ["Blog", "Socials", "Past Socials", "Clubs", "Contact"];

const Header = () => {
  return (
    <div>
      <Row className="py-2">
        <Col xs={6}>
          <img src="/logo.png"></img>
        </Col>
        <Col
          xs={6}
          className="d-flex align-items-center justify-content-end"
          style={{ gap: 32 }}
        >
          {texts.map((text) => (
            <div
              key={text}
              className="d-flex align-items-center"
              style={{ fontWeight: 600, color: "#333", gap: 8 }}
            >
              {text}
              {text === "Clubs" && <img src="/arrow-icon.png" />}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
