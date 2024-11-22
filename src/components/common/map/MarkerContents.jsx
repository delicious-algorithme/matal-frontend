import { DarkGrey, Orange } from '../../../color';

const MarkerContents = ({ name, positiveKeywords, imageUrls, rating }) => {
    const starSvg = `<svg width="13" height="13" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8227 1.52508L16.5568 8.00086C16.6597 8.24453 16.8236 8.45507 17.0315 8.61053C17.2395 8.76599 17.4838 8.86066 17.7389 8.88469L24.3994 9.50484C25.153 9.61875 25.4536 10.5785 24.9072 11.1312L19.89 15.5081C19.4838 15.8625 19.2989 16.4194 19.4107 16.9573L20.8691 24.0469C20.9971 24.8252 20.211 25.4201 19.5366 25.0509L13.7232 21.5156C13.5039 21.3819 13.2543 21.3114 13 21.3114C12.7458 21.3114 12.4962 21.3819 12.2769 21.5156L6.46348 25.0488C5.79113 25.4159 5.00301 24.8231 5.13098 24.0448L6.58941 16.9552C6.6991 16.4173 6.51629 15.8604 6.11004 15.506L1.09082 11.1333C0.546444 10.5827 0.847069 9.62086 1.59863 9.50695L8.2591 8.8868C8.51427 8.86277 8.75856 8.7681 8.9665 8.61264C9.17443 8.45718 9.33839 8.24664 9.44129 8.00297L12.1754 1.52719C12.5146 0.818438 13.4855 0.818438 13.8227 1.52508Z" fill="#FDD835"/>
<path d="M13.6236 8.38899L13.1605 3.61759C13.1422 3.3518 13.0894 2.89618 13.4997 2.89618C13.8247 2.89618 14.0015 3.5986 14.0015 3.5986L15.3908 7.42923C15.9149 8.8868 15.6996 9.38673 15.1938 9.68204C14.6129 10.0195 13.7557 9.75587 13.6236 8.38899Z" fill="#FFFF8D"/>
<path d="M19.3538 15.0841L23.3391 11.8547C23.5362 11.6838 23.8916 11.4117 23.6072 11.1016C23.3818 10.8569 22.7724 11.2092 22.7724 11.2092L19.2847 12.6246C18.2447 12.9979 17.5541 13.5506 17.4932 14.2467C17.414 15.1748 18.2163 15.8899 19.3538 15.0841Z" fill="#F4B400"/>
</svg>
`;
    const contentString = [
        '<div style ="display:flex; flex-direction: column;gap: 10px;padding: 10px;cursor:pointer;width:fit-content;height:200;">',
        '<div style ="width:120px;height:70px;border-radius: 10px;">',
        `<img  src = "${imageUrls}" alt = "storeImg" style = "width: 120px;height:70px;border-radius: 10px;"/>`,
        '</div>',
        ` <h4  style ="cursor:pointer;font-weight:700;">${name}</h4>`,
        `<div style ="width:100%;display:flex;flex-direction:row; gap:5px; >`,
        '<p style = "width10px";>',
        `  ${starSvg}`,
        ` <span style ="font-size:13px;cursor:pointer;font-weight:600;color:${Orange};">${rating}</span>`,
        '</p>',
        '</div>',
        `<p style ="cursor:pointer;font-size: 10px;padding-bottom:10px; padding-right:10px;font-weight: 700;color:${DarkGrey};">${positiveKeywords} </p>`,
        '</div>',
    ];

    return contentString.join('');
};

export default MarkerContents;
