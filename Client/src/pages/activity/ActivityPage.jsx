import styles from "./ActivityPage.module.css"

function ActivityPage() {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="https://th.bing.com/th/id/OIP.Pllr9bqKscUCGIQMMFowGgHaE8?w=800&h=534&rs=1&pid=ImgDetMain"></img>
            <h2 className={styles.title}>title</h2>
            <p className={styles.paragraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis officiis ipsa sit repudiandae fugiat, magni nemo consequatur molestiae, et ab ullam laudantium voluptatum possimus. Hic nostrum cumque a doloremque quia ullam laudantium. Pariatur sed porro ullam inventore asperiores quae ipsum quam, fugiat natus? Quidem vitae odit sequi nam, perferendis fuga.</p>
        </div>
    )
}

export default ActivityPage