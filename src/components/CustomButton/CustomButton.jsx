import { Button, Col } from 'antd';
import PropTypes from 'prop-types';

import styles from './CustomButton.module.css'

export default function CustomButton({type, text, onClick, color, danger, disabled, colStyle}) {
  
  return (
    <Col xs={{ span: 24 }} sm={{ span: 7 }} className={styles.buttonCol} style={colStyle}>
      <Button
        type={type}
        block
        onClick={onClick}
        htmlType="submit"
        className={styles[color]}
        danger={danger}
        disabled={disabled}
      >{text}</Button>
    </Col>
  )
}

CustomButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  colStyle: PropTypes.object,
};

CustomButton.defaultProps = {
  type: 'primary',
  color: '',
  danger: false,
  disabled: false
};
