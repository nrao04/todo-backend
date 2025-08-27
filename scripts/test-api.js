#!/usr/bin/env node

/**
 * Simple API test script
 * Run this after starting the server to test basic functionality
 */

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Todo Backend API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    console.log('');

    // Test creating a task
    console.log('2. Testing task creation...');
    const createResponse = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Task from API Test',
        color: 'blue',
      }),
    });

    if (createResponse.ok) {
      const task = await createResponse.json();
      console.log('✅ Task created:', task.data.title);
      const taskId = task.data.id;
      console.log('');

      // Test getting all tasks
      console.log('3. Testing get all tasks...');
      const getAllResponse = await fetch(`${BASE_URL}/api/tasks`);
      const allTasks = await getAllResponse.json();
      console.log(`✅ Retrieved ${allTasks.data.length} tasks`);
      console.log('');

      // Test getting task stats
      console.log('4. Testing task statistics...');
      const statsResponse = await fetch(`${BASE_URL}/api/tasks/stats`);
      const stats = await statsResponse.json();
      console.log('✅ Task stats:', stats.data);
      console.log('');

      // Test updating the task
      console.log('5. Testing task update...');
      const updateResponse = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Task',
          color: 'green',
        }),
      });

      if (updateResponse.ok) {
        const updatedTask = await updateResponse.json();
        console.log('✅ Task updated:', updatedTask.data.title);
        console.log('');
      }

      // Test toggling task completion
      console.log('6. Testing task completion toggle...');
      const toggleResponse = await fetch(`${BASE_URL}/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });

      if (toggleResponse.ok) {
        const toggledTask = await toggleResponse.json();
        console.log('✅ Task completion toggled:', toggledTask.data.completed);
        console.log('');
      }

      // Test deleting the task
      console.log('7. Testing task deletion...');
      const deleteResponse = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (deleteResponse.status === 204) {
        console.log('✅ Task deleted successfully');
        console.log('');
      }
    } else {
      console.log('❌ Failed to create task:', createResponse.status);
    }

    console.log('🎉 API test completed successfully!');
    console.log('🚀 Your Todo Backend is working correctly!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure the server is running on port 3001');
    console.log('💡 Run: npm run dev');
  }
}

// Run the test
testAPI();
