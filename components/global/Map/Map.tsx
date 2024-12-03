import React from 'react';

const Map: React.FC = () => {
  return (
    <div>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52360.21306099207!2d-54.980779085120936!3d-34.893565598910335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95751a97c925fab1%3A0x4c3ae595519715fd!2s20000%20Maldonado%2C%20Maldonado%20Department%2C%20Uruguay!5e0!3m2!1sen!2sbd!4v1733241790255!5m2!1sen!2sbd'
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </div>
  );
};

export default Map;
