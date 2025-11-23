const BACKEND_URL = "https://your-render-url.onrender.com";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let file = document.getElementById("fileInput").files[0];
    let lang = document.getElementById("language").value;
    let status = document.getElementById("status");

    if (!file) {
        alert("Please select a file!");
        return;
    }

    let formData = new FormData();
    formData.append("document", file);
    formData.append("language", lang);

    status.innerHTML = "Uploading & translating... please wait.";

    let res = await fetch(`${BACKEND_URL}/translate`, {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        let blob = await res.blob();
        let url = window.URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "translated_output.docx";
        a.click();

        status.innerHTML = "Translation completed. Download started!";
    } else {
        status.innerHTML = "Error translating file.";
    }
});
