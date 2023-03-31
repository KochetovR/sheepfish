import { Link } from 'react-router-dom';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

import styles from './NavMenu.module.css'

export default function NavMenu() {
  const isMobleScreen = useMediaQuery({
    query: '(max-width: 575px)'
  })

  const { pathname } = useLocation();

  return (
    <nav className={styles.menu}>
        <ul className={styles.menuList}>
            {pathname !== '/' &&
                <li className={styles.menuItem}>
                    {!isMobleScreen &&
                        <Link to="/" className={styles.menuILink}>
                            На головну
                        </Link>
                    }
                    {isMobleScreen &&
                        <Link to="/" className={styles.menuILink}>
                            <HomeOutlined style={{ fontSize: '36px' }}/>
                        </Link>
                    }
                </li>
            }
            {pathname !== '/add-product' &&
                <li className={styles.menuItem}>
                    {!isMobleScreen &&
                        <Link to="/add-product" className={styles.menuILink}>
                            Додати товар
                        </Link>
                    }
                    {isMobleScreen &&
                        <Link to="/add-product" className={styles.menuILink}>
                            <PlusCircleOutlined style={{ fontSize: '36px' }} />
                        </Link>
                    }
                </li>
            }
        </ul>
    </nav>
  )
}
