import React from 'react';
import Marquee from "react-fast-marquee";

const HeadingSlider = () => {
    const headerContents = [
        { teamOne : 'LOS ANGELES LAKERS', teamSecond : 'MINNESOTA TIMBERWOLVES', units: '+.080 units', hours : '5 hours' },
        { teamOne : 'LOS ANGELES LAKERS', teamSecond : 'MINNESOTA TIMBERWOLVES', units: '+.080 units', hours : '5 hours' },
        { teamOne : 'LOS ANGELES LAKERS', teamSecond : 'MINNESOTA TIMBERWOLVES', units: '+.080 units', hours : '5 hours' },
        { teamOne : 'LOS ANGELES LAKERS', teamSecond : 'MINNESOTA TIMBERWOLVES', units: '+.080 units', hours : '5 hours' },
    ];
    return (
        <section className='bg-[#262626] text-white px-2 text-sm py-3 font-urbanist'>
            <Marquee pauseOnHover={true}>
                {headerContents.map((data,index) => {
                    return(
                        <div key={index} className='px-5'>
                            <div className='flex items-center gap-3'>
                                <p>{data.teamOne}</p>
                                <p className='text-[#FE7234]'>vs</p>
                                <p>{data.teamSecond}</p>
                                <p className='text-[#00D95F]'>{data.units}</p>
                                <p className='bg-[#313131] py-2 px-4 rounded-md'>{data.hours}</p>
                            </div>
                        </div>
                    )
                })}
            </Marquee>
        </section>
    )
}

export default HeadingSlider