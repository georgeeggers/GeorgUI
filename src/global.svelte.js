export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}
 
const encoder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=_+/?.>,<!@#$%^&*()~`";

export const random = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

export const getID = () => {
    let id = "";
    for(let i = 0; i < 15; i++){
        id += encoder[random(0, encoder.length - 1)];
    }

    return id;
}

