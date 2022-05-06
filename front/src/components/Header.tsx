import styles from '../styles/Header.module.css'
import Image from 'next/image'

export default function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.image}>
				<Image src="/img/skull.svg" alt="" layout="fill" objectFit="contain" />
			</div>
			<div className={styles.title}>
				O CRÂNIO
			</div>
		</div>
	)
}