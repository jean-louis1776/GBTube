import styles from './child-item.module.scss';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetChildrenController from '../../controllers/GetChildrenController';

export const ChildItem = ({ childType }) => {
  const { id } = useParams();
  let [title, setTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let [idList, setIdList] = useState(location.state.idList);

  useEffect(() => {
    const fetchData = async () => {
      const { id, title } = await GetChildrenController.getItemById(childType, id);
      setTitle(title);
      setIdList([...idList, id]);
    }
    fetchData().catch(() => {
      setTitle('');
      console.log(`${childType} ID: ${id} not found`);
    });
  },[]);

  const handleClick = () => {
    navigate(`/${childType}/get_one/:${id}`, { state: { idList } });
  }

  return (
    // <Link to={`/${childType}/get_one/:${id}`}></Link>
      <Box onClick={handleClick} className={styles.child}>
        <Typography className={styles.title}>
          { title }
        </Typography>
      </Box>
  );
}
export default ChildItem;
