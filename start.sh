#!/bin/bash

# SlotFit Development Start Script

echo "🏋️ Starting SlotFit - Adaptive Hypertrophy Trainer"
echo "================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "Creating from template..."
    cp .env.local.example .env.local
    echo "Please edit .env.local with your Supabase credentials"
    echo ""
fi

echo "🚀 Starting development server..."
echo "Open http://localhost:3000 in your browser"
echo ""

npm run dev