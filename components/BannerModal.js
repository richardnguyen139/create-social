import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

const banners = [
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg",
];

const BannerModal = ({ isOpen, setIsOpen, banner, setBanner }) => {
  const toggle = () => setIsOpen(!isOpen);
  const [selectedBanner, setSelectedBanner] = useState(banner);
  const save = () => {
    setBanner(selectedBanner);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedBanner(banner);
  }, [banner, isOpen]);
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <span style={{ fontWeight: 700 }}>Choose a banner</span>
      </ModalHeader>
      <ModalBody>
        <Row style={{ gap: 0 }}>
          {banners.map((item) => (
            <Col className="p-1" key={item} xs={2}>
              <img
                src={item}
                style={{
                  maxWidth: "100%",
                  aspectRatio: "3 / 2",
                  cursor: "pointer",
                  border:
                    selectedBanner === item
                      ? "1px solid black"
                      : "1px solid transparent",
                }}
                onClick={() => setSelectedBanner(item)}
              />
            </Col>
          ))}
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="link"
          onClick={toggle}
          style={{ fontWeight: 600, textDecoration: "none", color: "gray" }}
        >
          Close
        </Button>{" "}
        <Button
          onClick={save}
          style={{
            background: "#FEF452",
            fontWeight: 600,
            color: "#942F70",
            border: "none",
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BannerModal;
