import { useState } from 'react';

const CommentForm = () => {
  const [handleComment, setHandleComment] = useState({
      uname : '',
      review : '',
      rating : ''
  });

  const [inputError, setInputError] = useState({});

  const validation = () => {

        let obj = {};

        if(handleComment.uname == ''){
            obj.uname = " Username Must Be Required...";
        }

        if(handleComment.review == ''){
            obj.review = " Review Must Be Required...";
        }

        if(handleComment.rating == ''){
          obj.rating = "Rating Must Be Required...";
      }

        setInputError(obj);

        if(Object.keys(obj).length > 0){
            return false;
        }else{
            return true;
        }   
    }

  const handleInput = (e) => {
    setHandleComment({...handleComment,[e.target.name] : e.target.value});
    setHandleComment(ratingData => ({...ratingData, rating: e}));
  }

  const handleRatingInput = (rate) => {
    setHandleComment(ratingStar => ({...ratingStar, rating: rate}));
  }

  const [storeData, setStoreData] = useState([]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if(validation()){

      const copyPredata = {...handleComment};

      setStoreData((data) => [...data,copyPredata]);

      setHandleComment({
        uname : '',
        review : '',
        rating : ''
      });
    }

  };

  console.log("all data",storeData);
  

  return (
    <div>
      <h1 className='my-5 text-center'>Add Your Feedback</h1>
      <form onSubmit={handleSubmit} className='row g-3 form'>
        <div className="col-12">
          <label className='form-label'>Enter Username :</label>{inputError.uname ? <span>{inputError.uname}</span> : ''}
          <input type='text' className='form-control' placeholder="Your Username" name='uname' value={handleComment.uname} onChange={handleInput} />
        </div>
        <div className="col-12">
          <label className='form-label'>Enter Review :</label>{inputError.review ? <span>{inputError.review}</span> : ''}
          <textarea name='review' value={handleComment.review} onChange={handleInput} placeholder="Your review" className='form-control' />
        </div>
        <div className='col-12 d-flex align-items-center'>
          <label className='form-label mt-1'>Enter Rating : </label>
          {[1, 2, 3, 4, 5].map((num) => (
            <button type="button" className='btn' key={num} onClick={() => handleRatingInput(num)} name='rating' value={num}>
              {num <= handleComment.rating ? '★' : '☆'}
            </button>
          ))}
          {inputError.rating ? <span>{inputError.rating}</span> : ''}
        </div>
        <button type="submit" className='submitbtn'>Submit</button>
      </form>

      <h1 className='my-5 text-center show'>Show Reviews</h1>
      {storeData.map((review, index) => (
        <div key={index} className='container'>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="card my-3">
                <div className="d-flex align-items-between">
                  <div className="col-2 d-flex justify-content-between">
                    <img src="../src/assets/images/client/profile.png" alt="Profile Img" className='img-fluid' />
                  </div>
                  <div className="ms-3 d-flex align-items-between justify-content-between flex-column w-100">
                    <h6 className='review'>{'" ' + review.review + ' "'}</h6>
                    <div className="rate d-flex justify-content-between align-items-center">
                      <h4 className='username'>
                        ~ {review.uname}  
                      </h4>
                      <p className='rating'>{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* <p>{review.uname}</p>
          <p>{review.review}</p>
          <p className='rating'>{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentForm;