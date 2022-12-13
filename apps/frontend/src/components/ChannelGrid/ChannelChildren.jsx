import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';
import { Loader } from '../index';
import { CHANNEL } from '@constants/frontend';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditItemController from '../../controllers/EditItemController';

import styles from './ChannelChildren.module.scss';

export const ChannelChildren = ({ childType, itemId }) => {
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  let [idListState, setIdList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { title, idList } = await GetChildrenController.getItemById(
        childType,
        itemId.split('_').at(-1)
      );
      setIdList([...idList.split('_')]);
      setContent(
        title.length > 20 ? (
          <Tooltip title={title}>
            <Typography className={styles.title}>
              {title.slice(0, 20) + '...'}
            </Typography>
          </Tooltip>
        ) : (
          <Typography className={styles.title}>{title}</Typography>
        )
      );
    };
    fetchData().catch(() => {
      setContent(<Typography className={styles.title}>No data</Typography>);
      console.log(`${CHANNEL} ID: ${itemId} not found in ChildItem`);
    });
  }, []);

  const handleClick = () => {
    const url = `/${CHANNEL}/${idListState.join('_')}`;
    navigate(url);
  };

  const handleDeleteChannel = async () => {
    try {
      await EditItemController.deleteItem(CHANNEL, itemId.split('_').at(-1));
    } catch (err) {
      console.log('delete channel fail', err);
    }
    window.location.reload(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box className={styles.ChannelWrapper}>
        <Box className={styles.ChannelLink} onClick={handleClick}>
          <Avatar />

          {content}
        </Box>

        <Box className={styles.deleteChannel}>
          <IconButton
            aria-label="delete"
            className={styles.deleteButton}
            onClick={handleOpenModal}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>

      <ConfirmModal
        submitAction={handleDeleteChannel}
        openModal={openModal}
        closeModal={handleCloseModal}
        title="Вы хотите полностью удалить этот канал?"
        content='Нажимая "Удалить", вы удалите канал вместе с видео, плейлистами и вашими подписчиками без возможности восстановления. Для отмены нажмите "Отмена".'
        cancelButton="Отмена"
        submitButton="Удалить канал"
      />
    </>
  );
};
export default ChannelChildren;
