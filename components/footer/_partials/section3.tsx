import {call, mail, whatsapp } from '../../all_icons';
const Section3 = () => {
  return (
    <>
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-3 md:gap-18">
            <div className="flex gap-1">
                <div>
                    {call}
                </div>
                <div className="text-secondary text-[11px] lg:text-sm my-auto">
                    +91-1283281923
                </div>
            </div>
            <div className="flex gap-1">
                <div>
                    {whatsapp}
                </div>
                <div className="text-secondary text-[11px] lg:text-sm my-auto">
                    +91-1283281923
                </div>
            </div>
            <div className="flex gap-1">
                <div>
                    {mail}
                </div>
                <div className="text-secondary text-[11px] lg:text-sm my-auto">
                    +91-1283281923
                </div>
            </div>
        </div> 
        <hr className="text-zinc-300 w-2/5 mx-auto my-5"/>
        <p className="text-center text-secondary text-[11px] lg:text-sm font-semibold">
            © 2025 AXTO. All Rights Reserved.
        </p>

    </>
  )
}

export default Section3
