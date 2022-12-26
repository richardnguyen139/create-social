import { Row, Col, Container, Input, Label, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CreatableSelect from 'react-select/creatable';

import Loading from '../components/Loading';
import Header from '../components/Header';
import BannerModal from '../components/BannerModal';
import countries from '../utils/countries.json';

const allTags = ['Engineering', 'Product', 'Marketing', 'Design'];
const privacies = ['Public', 'Curated Audience', 'Community Only'];

const countryOptions = countries.map((item) => ({ value: item, label: item }));

const App = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState('');
  const [venue, setVenue] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [isManualApprove, setIsManualisManualApprove] = useState(false);
  const [privacy, setPrivacy] = useState(privacies[0]);
  const [banner, setBanner] = useState('');
  const [tags, setTags] = useState([]);

  const unSelectedTags = allTags.filter((item) => !tags.includes(item));

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((item) => item !== tag));
      return;
    }
    setTags([...tags, tag]);
  };

  const validate = () => {
    if (!title || !title.trim()) throw Error('Title is empty');
    if (!startAt) throw Error('Date is empty');
    if (!venue || !venue.trim()) throw Error('Venue is empty');
    if (!description || !description.trim())
      throw Error('Description is empty');
    if (!banner || !banner.trim()) throw Error('Banner is empty');
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      validate();
      const data = {
        title,
        startAt: startAt.toISOString(),
        venue,
        capacity,
        price,
        description,
        isManualApprove,
        privacy,
        banner,
        tags,
      };

      const res = await axios.post(
        "https://1p8s3jhf8j.execute-api.us-east-1.amazonaws.com/Supermomos/interview/social",
        data
      );

      if (res.status === 200) {
        router.push(
          {
            pathname: '/detail',
            query: { ...data },
          },
          '/detail'
        );
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(138.11deg, #FEF452 0%, #942F70 121.92%)',
      }}
    >
      <Loading isLoading={isLoading} />
      <BannerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        banner={banner}
        setBanner={setBanner}
      />
      <Container
        className="d-flex flex-column"
        style={{ minHeight: '100vh', gap: 32 }}
      >
        <Header />
        <div className="d-flex flex-column py-5" style={{ gap: 32 }}>
          <Row>
            <Col xs={5} className="d-flex flex-column" style={{ gap: 16 }}>
              <div>
                <Label>Event title</Label>
                <Input
                  placeholder="Event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <img src="/date-icon.png" />
                <DatePicker
                  placeholderText="Date"
                  customInput={<Input />}
                  selected={startAt}
                  onChange={(date) => setStartAt(date)}
                />
                <img src="/time-icon.png" />
                <DatePicker
                  selected={startAt}
                  onChange={(date) => setStartAt(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  placeholderText="Time"
                  customInput={<Input />}
                />
              </div>
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <img src="/location-icon.png" />
                <div style={{ flex: 1 }}>
                  <CreatableSelect
                    isClearable
                    options={countryOptions}
                    onChange={(e) => setVenue(e ? e.value : '')}
                    placeholder="Venue"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <img src="/max-icon.png" />
                <Input
                  placeholder="Max capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
                <img src="/cost-icon.png" />
                <Input
                  placeholder="Cost per person"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
            </Col>
            <Col xs={7}>
              {banner ? (
                <img
                  src={banner}
                  style={{
                    maxWidth: '100%',
                    aspectRatio: '2 / 1',
                    cursor: 'pointer',
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                  }}
                  onClick={() => setIsOpen(true)}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    aspectRatio: '2 / 1',
                    gap: 16,
                    border: '1px dashed white',
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  <img src="/banner-icon.png" />
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#14597A',
                    }}
                  >
                    Add a banner
                  </div>
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={6} className="d-flex flex-column" style={{ gap: 16 }}>
              <div>
                <Label>Description</Label>
                <Input
                  placeholder="Description of your event..."
                  type="textarea"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div
                className="d-flex flex-column p-3 bg-white rounded"
                style={{ gap: 16 }}
              >
                <p
                  className="h3 p-2 align-self-start"
                  style={{
                    background: '#FEF452',
                    fontWeight: 700,
                    color: '#942F70',
                  }}
                >
                  Settings
                </p>
                <div
                  className="d-flex"
                  style={{
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#344054',
                  }}
                >
                  <Input
                    type="checkbox"
                    checked={isManualApprove}
                    onChange={(e) =>
                      setIsManualisManualApprove(e.target.checked)
                    }
                  />
                  I want to approve attendees
                </div>
                <div className="d-flex flex-column" style={{ gap: 8 }}>
                  <div style={{ fontWeight: 600, color: '#344054' }}>
                    Privacy
                  </div>
                  <div className="d-flex" style={{ gap: 32 }}>
                    {privacies.map((item) => (
                      <div
                        key={item}
                        className="d-flex"
                        style={{ gap: 8, fontSize: 14, color: '#475467' }}
                      >
                        <Input
                          type="radio"
                          checked={privacy === item}
                          onChange={(e) => setPrivacy(item)}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#344054' }}>
                    Tag your social
                  </div>
                  <div style={{ color: '#475467' }}>
                    Pick tags for our curation engine to work its magin
                  </div>
                  <div className="d-flex p-2" style={{ gap: 16 }}>
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="d-flex align-items-center"
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: 'pointer',
                          gap: 8,
                          color: '#942F70',
                        }}
                      >
                        {tag}
                        <img
                          src="/tick-icon.png"
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleTag(tag)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex p-2" style={{ gap: 16 }}>
                    {unSelectedTags.map((tag) => (
                      <div
                        key={tag}
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#344054',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                color="warning"
                style={{
                  backgroundColor: '#FEF452',
                  color: '#942F70',
                  fontWeight: 600,
                }}
                onClick={submit}
              >
                CREATE SOCIAL
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default App;
