import { Row, Col, Container } from 'reactstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import Header from '../components/Header';

const Detail = () => {
  const { push, query } = useRouter();
  const {
    title,
    startAt,
    banner,
    capacity,
    description,
    isManualApprove,
    venue,
    price,
  } = query;

  useEffect(() => {
    if (!query || !Object.keys(query).length) {
      push('/');
    }
  }, [query]);

  return (
    <div
      style={{
        background: 'linear-gradient(138.11deg, #FEF452 0%, #942F70 121.92%)',
      }}
    >
      <Container
        className="d-flex flex-column"
        style={{ minHeight: '100vh', gap: 32 }}
      >
        <Header />
        <div className="d-flex flex-column py-5" style={{ gap: 32 }}>
          <Row>
            <Col xs={5}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 30,
                  backgroundColor: '#942F70',
                  color: 'white',
                  gap: 8,
                  display: 'inline',
                  padding: '8px 0px',
                  boxShadow: '8px 0 0 #942F70,-8px 0 0 #942F70',
                  boxDecorationBreak: 'clone',
                  lineHeight: 2,
                }}
              >
                {title}
              </p>
              <div className="mt-3 d-flex flex-column" style={{ gap: 16 }}>
                <div
                  className="d-flex align-items-center mb-2"
                  style={{ gap: 8 }}
                >
                  <img src="/date-icon.png" />
                  <div style={{ fontWeight: 600, fontSize: 18 }}>
                    {moment(new Date(startAt)).format('MMM DD, ddd')}
                  </div>
                  <img src="/time-icon.png" />
                  <div style={{ fontWeight: 600, fontSize: 18 }}>
                    {moment(new Date(startAt)).format('h A')}
                  </div>
                </div>
                <div className="d-flex align-items-center" style={{ gap: 8 }}>
                  <img src="/location-icon.png" />
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{venue}</div>
                </div>
                <div className="d-flex align-items-center" style={{ gap: 32 }}>
                  <div className="d-flex align-items-center" style={{ gap: 8 }}>
                    <img src="/max-icon.png" />
                    <div style={{ fontWeight: 600, fontSize: 12 }}>
                      {capacity} people
                    </div>
                  </div>
                  <div className="d-flex align-items-center" style={{ gap: 8 }}>
                    <img src="/cost-icon.png" />
                    <div style={{ fontWeight: 600, fontSize: 12 }}>
                      ${price}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={7}>
              <img
                src={banner}
                style={{
                  maxWidth: '100%',
                  aspectRatio: '2 / 1',
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={6} className="d-flex flex-column" style={{ gap: 16 }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{description}</div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Detail;
