const bcrypt = require('bcrypt');

async function generateHashedPassword() {
    const plainPassword = 'admin123'; // 您想要哈希的密码
    const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 是 bcrypt 的成本因子
    console.log('Hashed Password:', hashedPassword);
}

generateHashedPassword();
