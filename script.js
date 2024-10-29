function formatNumber(num) {
    if (isNaN(num)) return ''; // Kiểm tra NaN
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function unformatNumber(value) {
    return value.replace(/,/g, ''); // Loại bỏ dấu phẩy để tính toán
}

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
        const cursorPos = this.selectionStart; // Vị trí con trỏ hiện tại
        const originalLength = this.value.length; // Độ dài ban đầu

        const valueWithoutComma = unformatNumber(this.value);
        if (!isNaN(valueWithoutComma)) {
            this.value = formatNumber(valueWithoutComma);
        }

        // Điều chỉnh lại vị trí con trỏ
        const newLength = this.value.length;
        this.setSelectionRange(cursorPos + (newLength - originalLength), cursorPos + (newLength - originalLength));
    });
});

document.getElementById('interest-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const principal = parseFloat(unformatNumber(document.getElementById('principal').value)) || 0;
    const rate = parseFloat(unformatNumber(document.getElementById('rate').value)) || 0;
    const time = parseFloat(unformatNumber(document.getElementById('time').value)) || 0;
    const annualContribution = parseFloat(unformatNumber(document.getElementById('annual-contribution').value)) || 0;

    let totalAmount = principal;

    for (let year = 1; year <= time; year++) {
        totalAmount += annualContribution;
        const interest = (totalAmount * rate) / 100;
        totalAmount += interest;
    }

    const totalInterest = totalAmount - principal - (annualContribution * time);

    document.getElementById('result').innerText =
        `Lãi suất tổng cộng: ${formatNumber(totalInterest.toFixed(2))} VND\n` +
        `Tổng số tiền sau ${time} năm: ${formatNumber(totalAmount.toFixed(2))} VND`;
});
