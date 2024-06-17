export const EPOCHTODATE = (epochDate) => {
    const date = new Date(epochDate);
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const dayOfWeek = weekdays[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${day}/${month}/${year}`;
};

export const EPOCHTODATETIME = (epochDate) => {
    const date = new Date(epochDate);
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const dayOfWeek = weekdays[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes} ${dayOfWeek}, ${day}/${month}/${year} `;
};
export const EPOCHTODATETODAY = (epochDate) => {
    const date = new Date(epochDate);
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const dayOfWeek = weekdays[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${dayOfWeek}, ${day}/${month}/${year} - ${hours}:${minutes}`;
};

export const EPOCHTODATETIMETOTIME = (epochDateStart, epochDateEnd) => {
    const startDate = new Date(epochDateStart);
    const endDate = new Date(epochDateEnd);

    const startHours = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

    const durationHours = Math.floor((epochDateEnd - epochDateStart) / (1000 * 60 * 60));

    return `${durationHours} giờ, ${startHours}:${startMinutes} đến ${endHours}:${endMinutes}`;
};
