    export const downloadQr = (payData) => {
        if (!payData?.qrCode) return;
    
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
    
        // Enhanced dimensions
        const qrSize = 320;
        const padding = 40;
        const headerHeight = 80;
        const footerHeight = 100;
        const totalWidth = qrSize + (padding * 2);
        const totalHeight = qrSize + headerHeight + footerHeight + (padding * 2);
        const borderRadius = 20; // Added border radius
    
        canvas.width = totalWidth;
        canvas.height = totalHeight;
    
        // Function to draw rounded rectangle
        const drawRoundedRect = (x, y, width, height, radius) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
    
        // Main background with rounded corners
        ctx.fillStyle = '#ffffff';
        drawRoundedRect(0, 0, totalWidth, totalHeight, borderRadius);
        ctx.fill();
    
        // Gradient Background
        const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#f3f4f6");
        ctx.fillStyle = gradient;
        // Clip to rounded rectangle
        drawRoundedRect(0, 0, totalWidth, totalHeight, borderRadius);
        ctx.fill();
    
        // Header with gradient and rounded top corners
        const headerGradient = ctx.createLinearGradient(0, 0, totalWidth, 0);
        headerGradient.addColorStop(0, "#1e40af");
        headerGradient.addColorStop(1, "#3b82f6");
        ctx.fillStyle = headerGradient;
        
        // Draw header with only top corners rounded
        ctx.beginPath();
        ctx.moveTo(0, headerHeight);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.lineTo(totalWidth - borderRadius, 0);
        ctx.quadraticCurveTo(totalWidth, 0, totalWidth, borderRadius);
        ctx.lineTo(totalWidth, headerHeight);
        ctx.fill();
    
        // Add subtle pattern to header
        ctx.save();
        ctx.clip(); // Clip to header shape
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        for(let i = 0; i < totalWidth; i += 10) {
            ctx.fillRect(i, 0, 5, headerHeight);
        }
        ctx.restore();
    
        // Rest of your existing code...
        // Merchant Name in Header
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Inter, system-ui";
        ctx.textAlign = "center";
        ctx.fillText(payData.merchantName, totalWidth / 2, headerHeight / 2 + 10);
    
        // Subtle header subtitle
        ctx.font = "14px Inter, system-ui";
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillText("Scan to Pay", totalWidth / 2, headerHeight - 15);
    
        const img = new Image();
        img.onload = () => {
            // QR Code Container with shadow and rounded corners
            ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 5;
            ctx.fillStyle = "#ffffff";
            drawRoundedRect(padding - 5, headerHeight + padding - 5, qrSize + 10, qrSize + 10, 10);
            ctx.fill();
            ctx.shadowColor = "transparent";
    
            // Draw QR code
            ctx.drawImage(img, padding, headerHeight + padding, qrSize, qrSize);
    
            // Footer section with amount
            const footerY = headerHeight + qrSize + (padding * 2);
    
            // Amount container with rounded corners
            ctx.fillStyle = "#f8fafc";
            drawRoundedRect(padding, footerY - 10, totalWidth - (padding * 2), 60, 10);
            ctx.fill();
            ctx.strokeStyle = "#e2e8f0";
            ctx.lineWidth = 1;
            drawRoundedRect(padding, footerY - 10, totalWidth - (padding * 2), 60, 10);
            ctx.stroke();
    
            // Rest of your existing code...
            // Amount text
            ctx.fillStyle = "#0f172a";
            ctx.font = "bold 28px Inter, system-ui";
            ctx.fillText(`₹${payData.amount.toLocaleString()}`, totalWidth / 2, footerY + 30);
    
            // Transaction Details
            ctx.fillStyle = "#64748b";
            ctx.font = "13px Inter, system-ui";
            ctx.fillText(`Order ID: ${payData.clientTransactionId}`, totalWidth / 2, footerY + 70);
    
            // Add timestamp
            const date = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            ctx.font = "12px Inter, system-ui";
            ctx.fillText(date, totalWidth / 2, footerY + 90);
    
            // Save with better quality
            const link = document.createElement("a");
            link.download = `payment-${payData.clientTransactionId}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();
        };
    
        img.src = payData.qrCode;
    };