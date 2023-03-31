import { useState } from 'react';
import { Table, Pagination  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import { getFilterProducts } from '../../redux/selectors';
import { deleteItem } from '../../redux/productsSlice';
import { deleteProduct } from '../../redux/thunks';

import styles from './TableOfProducts.module.css'

export default function TableOfProducts() {
  const products = useSelector(getFilterProducts)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDelete = (e, key) => {
    e.stopPropagation();
    dispatch(deleteItem(key))
    dispatch(deleteProduct(key))
  };

  const handleClickOnRow = (id) => {
    navigate(`/product/${id}`);
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      responsive: ['md'],
    },
    {
      key: 'title',
      title: 'Назва',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'description',
      title: 'Опис',
      dataIndex: 'description',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      responsive: ['md'],
    },
    {
      key: 'price',
      title: 'Ціна',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'thumbnail',
      title: 'Фото',
      dataIndex: 'thumbnail',
      render: (thumbnail) => <img src={thumbnail? thumbnail : 'https://via.placeholder.com/150'} alt="Product" width={50} />,
      responsive: ['sm'],
    },
    {
      key: 'rating',
      title: 'Рейтинг',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ['descend', 'ascend'],
      responsive: ['sm'],
    },
    {
      key: 'stock',
      title: 'Сток',
      dataIndex: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ['descend', 'ascend'],
      responsive: ['lg'],
    },
    {
      key: 'category',
      title: 'Категорія',
      dataIndex: 'category',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      responsive: ['md'],
    },
    {
      key: 'delete',
      dataIndex: 'delete',
      title: ' ',
      width: '50px',
      render: (_, record) => {
        return (
          <DeleteOutlined onClick={(e) => handleDelete(e, record.key)} />
        );
      },
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (_, pageSize) => {
    setPageSize(pageSize)
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = products.slice(startIndex, endIndex);

  return (
    <>
      <Table
        columns={columns}
        dataSource={currentData.map(item => ({ ...item, key: item.id }))}
        className={styles.table}
        pagination={false}
        bordered
        locale={{ emptyText: 'Немає даних'}}
        onRow={(record) => {
          return {
            onClick: () => handleClickOnRow(record.id)
          };
        }}
      />
      <Pagination
        current={currentPage}
        total={products.length}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper 
        onChange={handlePageChange}
        onShowSizeChange={onShowSizeChange}
        responsive
      />
    </>
  )
}
