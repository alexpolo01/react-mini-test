import React, { useState } from 'react';
import Button from './Button';
import Modal from './Modal';

interface PostItemProps {
  title: string;
  body: string;
}

const PostItem: React.FC<PostItemProps> = ({ title, body }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncatedBody = body.length > 80 ? `${body.substring(0, 80)}...` : body;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid #eee',
          gap: '16px',
        }}
      >
        {/* First column: title + body */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#213547',
              textAlign: 'left',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#666',
              textAlign: 'left',
            }}
          >
            {truncatedBody}
          </p>
        </div>

        {/* Second column: view button */}
        <div>
          <Button label='View' onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title={title}
          body={body}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PostItem;
