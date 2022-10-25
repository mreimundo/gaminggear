import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'
import { getItemsById } from '../../services/firebase/firestore'
//import { useAsync } from '../../hooks/useAsync'

const ItemDetailContainer = () => {
    const { itemId } = useParams()
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(true)
        getItemsById(itemId).then(item => {
            setItem(item)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })

    }, [itemId])
    //const { data: {...item}, error, loading } = useAsync(() => getItemsById(itemId), [itemId]) //eslint-disable-line


    if(loading){
        return <h2 id="detailContainerTitle">Aguarde mientras carga su producto...</h2>
    }
    return (
        <div>
            <ItemDetail {...item}/>
        </div>
    )


}

export default ItemDetailContainer