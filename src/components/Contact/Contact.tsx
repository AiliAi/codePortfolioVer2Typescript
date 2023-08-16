import './contact.scss';
import { useState } from 'react';
import { send } from 'emailjs-com';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { AiOutlineClose } from 'react-icons/ai';

const appId: HTMLCollection = document.getElementsByClassName('.App');

const Contact = (): JSX.Element => {
 
  const [show, setShow] = useState<boolean>(false);
  const [postMessage, setPostMessage] = useState<string>('');
  
  
  show ? disableBodyScroll(appId as unknown as HTMLElement) : enableBodyScroll(appId as unknown as HTMLElement);

  /**
   * Form field names that have to be same as in the EmailJS template form
   */
  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  /**
   * Connects to the EmailJS api and sends response success or failed
   *
   * @param {*} e event
   */
  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    send(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_service_id}`, // SERVICE ID
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_template_id}`, // TEMPLATE ID
      toSend,
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_user_id}` // User ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setPostMessage('Thank you! Your message has been sent.');
        setShow(true);
        handleReset();
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setPostMessage('Failed to send message.');
        setShow(true);
      });
  };

  /**
   * Resets the form fields
   */
  const handleReset = (): void => {
    setToSend({
      from_name: '',
      to_name: '',
      message: '',
      reply_to: '',
    });
  };

  /**
   * Sends info to mail via EmailJS
   *
   * @param {*} e event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact">
      <h2>CONTACT</h2>
      <form className="contact-form" onSubmit={sendEmail}>
        <div className="form-item">
          <label>Name *</label>
          <input
            type="text"
            placeholder="name"
            name="from_name"
            value={toSend.from_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label>E-mail *</label>

          <input
            type="email"
            placeholder="name@email.com"
            name="reply_to"
            value={toSend.reply_to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label>Message *</label>
          <textarea
            placeholder="message"
            rows={5}
            cols={47}
            name="message"
            value={toSend.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-button">
          <button type="submit" className="round-button">
            <div className="button-text">Send</div>
          </button>
        </div>
      </form>
      {
        // modal
        show && (
          <div className="overlay-modal" onClick={() => setShow(false)}>
            <div className="contact-modal">
              <button
                className="modal-close"
                type="button"
                onClick={() => setShow(false)}
              >
                <AiOutlineClose />
              </button>
              <div className="modal-body">{postMessage}</div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Contact;