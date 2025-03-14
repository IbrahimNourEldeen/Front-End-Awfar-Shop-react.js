import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    totalProducts: 0,
    totalCategories: 0
  });

  const [chartData, setChartData] = useState({
    labels: [],
    completedOrders: [],
    cancelledOrders: [],
    pendingOrders: [],
  });

  const [barChart, setBarChart] = useState(null);
  const [pieChart, setPieChart] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost/ecommerce/dashboard/dashboard.php'); 
        if (response.data.status === 'success') {
          setStatistics(response.data.data);
          setChartData({
            labels: response.data.chartData.dates,
            completedOrders: response.data.chartData.completed,
            cancelledOrders: response.data.chartData.cancelled,
            pendingOrders: response.data.chartData.pending,
          });
        } else {
          console.error('Failed to fetch statistics');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      if (barChart) {
        barChart.destroy();
      }

      const ctx = document.getElementById('barChart');
      const newBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Completed Orders',
              data: chartData.completedOrders,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Cancelled Orders',
              data: chartData.cancelledOrders,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Pending Orders',
              data: chartData.pendingOrders,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setBarChart(newBarChart);
    }
  }, [chartData]);

  useEffect(() => {
    if (pieChart) {
      pieChart.destroy();
    }

    const ctx = document.getElementById('pieChart');
    const newPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [
          {
            data: [
              statistics.completedOrders,
              statistics.pendingOrders,
              statistics.cancelledOrders
            ],
            backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
            hoverBackgroundColor: ['#66BB6A', '#FFB74D', '#EF5350'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    setPieChart(newPieChart);
  }, [statistics]);

  return (
    <div className='h-100 position-relative overflow-auto'>
      <div className="container my-5">
        <h1 className="text-center mb-4">Dashboard</h1>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Total Orders</h5>
                <p>{statistics.totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Completed Orders</h5>
                <p>{statistics.completedOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Pending Orders</h5>
                <p>{statistics.pendingOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Cancelled Orders</h5>
                <p>{statistics.cancelledOrders}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Total Revenue</h5>
                <p>{statistics.totalRevenue} EGP</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Avg Order Value</h5>
                <p>{statistics.avgOrderValue} EGP</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Total Products</h5>
                <p>{statistics.totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Total Categories</h5>
                <p>{statistics.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center ">Order Status Distribution (Pie Chart)</h5>
                <div className='row justify-content-center'>
                <div className='col-12 col-md-6 col-lg-4'>
                <canvas id="pieChart"></canvas>
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
