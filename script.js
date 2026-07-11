// Save QR as JPG
async function download(url) {

    try {

        // Load image
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = async () => {

            // Create canvas
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            // White background (JPG doesn't support transparency)
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR
            ctx.drawImage(img, 0, 0);

            // Convert to JPG
            canvas.toBlob(async (blob) => {

                if (window.showSaveFilePicker) {

                    const handle = await window.showSaveFilePicker({

                        suggestedName: "QRCode.jpg",

                        types: [{
                            description: "JPEG Image",
                            accept: {
                                "image/jpeg": [".jpg"]
                            }
                        }]

                    });

                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();

                    alert("QR Code saved as JPG.");

                } else {

                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "QRCode.jpg";
                    a.click();
                    URL.revokeObjectURL(a.href);

                }

            }, "image/jpeg", 1.0);

        };

        img.src = url;

    } catch (err) {

        console.error(err);

    }

}