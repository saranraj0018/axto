import React from 'react'

type CommonBannersProps = {
  title: string
}

const CommonBanners = ({ title }: CommonBannersProps) => {
  return (
    <div>
      <div
        className="py-18 text-center text-4xl text-white font-semibold bg-cover"
        style={{
          backgroundImage: "url('/img/others/common-banner.png')",
          backgroundSize: "cover",
        }}
      >
        {title}
      </div>
    </div>
  )
}

export default CommonBanners;
