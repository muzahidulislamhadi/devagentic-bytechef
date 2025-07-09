#!/bin/bash

echo "🚀 ByteChef Status Check"
echo "======================="

# Check Frontend
if curl -s -o /dev/null http://localhost:5174; then
    echo "✅ Frontend: Ready at http://localhost:5174"
else
    echo "❌ Frontend: Not responding"
fi

# Check Backend
if curl -s -o /dev/null http://localhost:8080/actuator/health; then
    echo "✅ Backend: Ready at http://localhost:8080"
    echo ""
    echo "🎉 Application is fully ready!"
    echo "   Open: http://localhost:5174"
else
    echo "🔄 Backend: Still starting..."
    echo "   (This is normal - Java apps take 2-5 minutes on first run)"
fi

echo ""
