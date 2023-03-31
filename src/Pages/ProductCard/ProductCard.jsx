import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Row, Col, Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../redux/selectors';

import { deleteItem } from '../../redux/productsSlice';
import { deleteProduct } from '../../redux/thunks';

import CustomButton from '../../components/CustomButton/CustomButton';

import styles from './ProductCard.module.css'
import { useEffect } from 'react';

const { Meta } = Card;

export default function ProductCard() {
  const { productId } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const product = useSelector(getList).find(p => p.id == productId)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!product) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])


  const handleEditClick = (productId) => {
    navigate(`/edit-product/${productId}`);
  }
  const handleAddClick = () => {
    navigate('/add-product');
  }

  const handleDelete = (productId) => {
    dispatch(deleteItem(productId))
    dispatch(deleteProduct(productId))
    navigate('/')
  }

  return (
    <Row justify="center" className={styles.wrapper}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
        {product ? 
          <>
            <Card
              cover={
                product.images && product.images.length > 0 ? (
                  <Carousel autoplay>
                    {product.images.map((image, index) => (
                      <img alt={product.title} key={index} src={image} />
                    ))}
                  </Carousel>
                ) : (
                  <img
                    alt={product.title}
                    src="https://via.placeholder.com/150"
                    style={{ width: "100%", height: "auto" }}
                  />
                )
              }
                actions={[
                  <div>Ціна: <br className={styles.hidden}/><b>{product.price} $</b></div>,
                  <div>Рейтинг: <br className={styles.hidden}/><b>{product.rating} ⭐</b></div>,
                  <div>Доступно: <br className={styles.hidden}/><b>{product.stock}</b></div>,
                ]}
              className={styles.card}
            >
              <Meta title={product.title} description={product.description} />
              <p>Category: <b>{product.category}</b></p>
            </Card>
            <Row className={styles.buttonsWrapper}>
              <CustomButton text='Редагувати' onClick={() => handleEditClick(product.id)} />
              <CustomButton text='Додати' onClick={handleAddClick} color='green' />
              <CustomButton text='Видалити' onClick={() => handleDelete(product.id)} danger={true} />
            </Row>
          </>
          :
          <div className={styles.spiner}>
            <Spin size="large" tip="Завантаження..." delay={500} spinning={!product} />
          </div>
        }
      </Col>
    </Row>
  );
}