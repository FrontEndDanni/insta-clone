import getPhotoUrl from 'get-photo-url';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../dexie';

const Gallery = () => {
    const allPhotos = useLiveQuery(()=> db.gallery.toArray(), [])

    const addPhoto = async () => {
        db.gallery.add({
            url: await getPhotoUrl('#addPhotoInput'),
    })
    }

    const removePhoto = (id) => {
        let confirmDelete = "Are you sure you want to delete this photo?";
        if (window.confirm(confirmDelete) == true){
            db.gallery.delete(id)
        }
    }


    return(
        <>
            <input type="file" name="photo" id="addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={addPhoto}>
                <i className="add-photo-button fas fa-plus-square"></i> 
            </label>

            <section className="gallery">
                {!allPhotos && <p>Loading...</p>}
                {allPhotos?.map(photo => (
                    <div className="item" key={photo.id}>
                        <img src={photo.url} className="item-image" alt="" />
                        <button className="delete-button fas fa-trash" onClick={() => removePhoto(photo.id)} />
                    </div>
                ))}
            </section>
        </>  
    )
}

export default Gallery