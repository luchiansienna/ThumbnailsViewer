import React, { Fragment, useEffect, useState } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTimer, setSlideTimer] = useState(null)
  const [slideDuration] = useState(3000)

  const goToPreviousThumbnail = () => setActiveIndex(activeIndex => activeIndex > 0 ? activeIndex - 1 : catalogsList.length - 1);
  const goToNextThumbnail = () => setActiveIndex(activeIndex => activeIndex < catalogsList.length - 1 ? activeIndex + 1 : 0);
  const onThumbClick = (idx) => setActiveIndex(idx)
  const onChangeSlideShow = (e) => e.target.checked ? setSlideTimer(true) : setSlideTimer(false)

  const startSlideShow = () => goToNextThumbnail()
  
  useEffect(() => {
    if (slideTimer) {
      const interval = setInterval(startSlideShow, slideDuration)
      return () => clearInterval(interval);
    }
  }
    , [slideTimer])

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={goToPreviousThumbnail}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                onClick={onThumbClick}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={goToNextThumbnail}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            id="startSlideShow"
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={onChangeSlideShow}
          />
          <label for="startSlideShow" className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

