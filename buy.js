$(document).ready(function () {
    // Fungsi untuk menangani klik pada tombol "Buy"
    $("#buyButton").click(function () {
        console.log("Tombol 'Buy' ditekan!");

        // Menyiapkan konten yang akan dicetak (dari sidebar)
        var sidebarContent = $("#sidebarContent").html();

        // Membuat elemen div sementara untuk menyimpan konten
        var printContainer = $("<div>");

        // Menambahkan konten sidebar ke div sementara
        printContainer.append(sidebarContent);

        // Membuat dokumen baru untuk mencetak
        var printWindow = window.open('', '_blank');

        // Menulis konten dari div sementara ke dokumen yang akan dicetak
        printWindow.document.write('<html><head><title>Cetak</title></head><body>');
        printWindow.document.write(printContainer.html());
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        // Memanggil fungsi pencetakan
        printWindow.print();
    });

    // Fungsi untuk mendeteksi kombinasi "Ctrl + P"
    $(document).keydown(function (event) {
        // Ctrl + P
        if (event.ctrlKey && event.key === 'p') {
            console.log("Tombol 'Ctrl + P' ditekan. Melakukan pencetakan...");

            // Pastikan untuk menghentikan aksi default (pencetakan default browser)
            event.preventDefault();

            // Memanggil fungsi pencetakan saat kombinasi "Ctrl + P" ditekan
            $("#buyButton").click();
        }
    });
});
x