import React from 'react'
import './homepage.css'

const Story = () => {

  const video = 'https://youtu.be/Y9f54yJx_Uc';

  return (
    <div className='story'>
      <div className="story1">
        <div className="story2">
          <h2>Tasty restaurant</h2>
          <h4>The story so far</h4>
          <p>The road to Aso Rock began decades ago, in the small town of Ikenne, Nigeria. It is in Ikenne that Felicia Ajibabi Adesina first began what would become a long family tradition of selling delicious food. Felicia was locally known by her nickname of Aya Mase, and as word of her food began to spread, crowds would gather for a taste of her delicious recipe.</p>

          <p>In 1999 Rasidi Adesina. The third son of Aya Mase, planted his flag in Hackney. Working alongside his wife Victoria, they founded Aso-Rock Restaurant. Today, Aso-Rock operates under the stewardship of the children of Mr and Mrs Adesina – ensuring that the legacy of those before them is kept alive. We invite you all to come along and be a part of our journey. Nigerian food delivery available across London.
          </p>
        </div>
        <div className="story3">
          <img src="../div/fod.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Story