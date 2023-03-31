import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';


import { postAddNewProduct, putUpdateProduct } from '../../redux/thunks';
import { getList, } from '../../redux/selectors';

import CustomButton from '../../components/CustomButton/CustomButton';

import styles from './ProductsAddingForm.module.css'

export default function ProductsAddingForm({editMode}) {
  const listOfProducts = useSelector(getList)
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate()
  // eslint-disable-next-line
  const product = listOfProducts.find(p => p.id == productId)
  
  const initialValues = useMemo(() => ({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    photo: product?.photo || '',
    rating: product?.rating || '',
    stock: product?.stock || '',
    category: product?.category || '',
  }), [product])

  
  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Назва товару не повинна бути довшою за 50 символів').required("Поле обов'язкова для заповнення"),
    description: Yup.string().max(200, 'Опис товару не повинен бути довшим за 200 символів').required("Поле обов'язкова для заповнення"),
    price: Yup.number().min(0, 'Ціна не може бути негативною').required("Поле обов'язкова для заповнення"),
    rating: Yup.number().min(0, 'Рейтинг не може бути меншим 0').max(5, 'Рейтинг не може бути більше 5'),
    stock: Yup.number().min(0, 'Рейтинг не може бути меншим 0'),
    category: Yup.string().required("Поле обов'язкова для заповнення"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (product) {
      const updatedItem = {
        ...product,
        ...values,
      };
      dispatch(putUpdateProduct(updatedItem));
      navigate(`/product/${productId}`)
    } else {
      const newItem = {
        ...values,
        id: uuidv4(),
      };
      dispatch(postAddNewProduct(newItem));
      handleCancelClick()
    }
    resetForm();
  };

  const handleCheckName = ({ target: { value } }) => {
    if (product) {
        return
    }
    const checkRepeatProductsName = listOfProducts.find(e => e.title === value)
    if (checkRepeatProductsName) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  }

  const handleCancelClick = () => {
    navigate('/');
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
      {({ handleSubmit, handleChange, values, touched, errors, isValid}) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
            {product ? 
                <p className={styles.titleForm}>Редагувати <b>{product.title}</b></p>
                :
                <p className={styles.titleForm}>Додати новий товар</p>
            }

            <div className={styles.formField}>
                <label htmlFor="title">Назва товару</label>
                <Field
                    type="text"
                    name="title"
                    id="title"
                    onBlur={(e) => {
                        handleCheckName(e);
                    }}
                />
                {touched.title && errors.title ? (
                    <div className={styles.errorMessage}>{errors.title}</div>
                ) : null}
                {errorMessage ? (
                    <Alert
                    description="Такое название товара уже существует."
                    type="error"
                    />
                ) : null}
            </div>

            <div className={styles.formField}>
                <label htmlFor="description">Опис товару</label>
                <Field type="text" name="description" id="description" />
                {touched.description && errors.description ? (
                    <div className={styles.errorMessage}>{errors.description}</div>
                ) : null}
            </div>

            <div className={styles.formField}>
                <label htmlFor="price">Ціна</label>
                <Field type="number" name="price" id="price" />
                {touched.price && errors.price ? (
                    <div className={styles.errorMessage}>{errors.price}</div>
                ) : null}
            </div>

            <div className={styles.formField}>
                <label htmlFor="photo">Посилання на фото</label>
                <Field type="text" name="photo" id="photo" />
            </div>

            <div className={styles.formField}>
                <label htmlFor="rating">Рейтинг</label>
                <Field type="number" name="rating" id="rating" />
                {touched.rating && errors.rating ? (
                    <div className={styles.errorMessage}>{errors.rating}</div>
                ) : null}
            </div>

            <div className={styles.formField}>
                <label htmlFor="stock">Кількість на складі</label>
                <Field type="number" name="stock" id="stock" />
                {touched.stock && errors.stock ? (
                    <div className={styles.errorMessage}>{errors.stock}</div>
                ) : null}
            </div>

            <div className={styles.formField}>
                <label htmlFor="category">Категория</label>
                <Field
                    as="select"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={values.category}
                    className={touched.category && errors.category ? 'error' : ''}
                >
                    <option value="" disabled>
                        Выберите категорию
                    </option>
                    <option value="Категорія A">Категорія A</option>
                    <option value="Категорія B">Категорія B</option>
                    <option value="Категорія C">Категорія C</option>
                </Field>
                {touched.category && errors.category ? (
                    <div className={styles.errorMessage}>{errors.category}</div>
                ) : null}
            </div>
            
            <Row className={styles.buttonsWrapper}>
                {product ? 
                    <CustomButton text='Зберегти' type='submit' color={'green'} disabled={!isValid && errorMessage} />
                    :
                    <CustomButton text='Додати' type='submit' color={'green'} disabled={!isValid && errorMessage} />
                }
                <CustomButton text='Скасувати' danger={true} onClick={handleCancelClick} colStyle={{ marginLeft: '10px' }} />
            </Row>
        </Form>
      )}
    </Formik>
  );
}
