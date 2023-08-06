import React from 'react'
import classes from './create.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState("")
 
  const navigate = useNavigate()
  // we get the auth slice from the entire state, which(auth slice) 
  // is the userInfo and the token
  const { token } = useSelector((state) => state.auth)


  // type="file", e.target.files[0]
  const onChangeFile = (e) => {
    setImage(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImage('')
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      let filename = null

      if (image) {
        filename = Date.now() + image.name
        formData.append("filename", filename)
        formData.append("image", image)

        await fetch(`http://localhost:5000/upload`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: formData
        })
      }

      // uploading blog 
      const res = await fetch(`http://localhost:5000/blog`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          img: filename,
         
        })
      })

      const blog = await res.json()
       console.log(blog,"blog data");
      navigate('/')

    } catch (error) {
      console.error(error.message)
    }
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Blog</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input type="text"
              placeholder='Title...'
              className={classes.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input type="text"
              placeholder='Description...'
              className={classes.input}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          
          <div className={classes.inputWrapperImage}>
            <label htmlFor="image" className={classes.labelFileInput}>Image: <span>Upload here</span></label>
            <input type="file"
              id="image"
              placeholder='Image...'
              className={classes.input}
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
            {image && <p className={classes.imageName}>{image.name} <AiOutlineCloseCircle onClick={handleCloseImg} className={classes.closeIcon} /></p>}
          </div>
          
          
          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitBtn}>
              Submit 
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create