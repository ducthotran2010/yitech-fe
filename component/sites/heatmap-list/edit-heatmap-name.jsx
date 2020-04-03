import { Modal, message, Form, Input } from 'antd';
import { useRef, useState } from 'react';

import { FooterModal } from '../../footer-modal';
import { updateHeatmapName } from '../../../common/query-lib/heatmap-data/update-heatmap-name';
import { getAccessToken } from '../../../utils/account-utils';

export const EditHeatmapModal = ({
  visible,
  setVisible,
  heatmapID,
  name,
  setName,
  updateHeatmap,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEditName = async () => {
    setLoading(true);
    setError('');
    try {
      if (name == '') {
        setError('Please input heatmap name');
        return;
      }

      const token = getAccessToken();
      const response = await updateHeatmapName({
        trackingHeatmapInfoID: heatmapID,
        newName: name,
        token,
      });

      if (response.status == 200 || response.status == 304) {
        updateHeatmap({ heatmapID, name });
        message.success('Ok');
        setVisible(false);
      }
    } catch (error) {
      setError('Could not edit Heatmap name');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Heatmap Tracking"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={
        <FooterModal
          onCancel={() => setVisible(false)}
          onSubmit={handleEditName}
          loading={loading}
        />
      }
    >
      {visible && (
        <Input
          size="large"
          value={name}
          defaultValue={name}
          onChange={event => setName(event.target.value)}
          type="basic"
          placeholder="Enter your Heatmap name"
        />
      )}

      {error && (
        <span className="block mb-4 text-red-600 text-center">{error}</span>
      )}
    </Modal>
  );
};
