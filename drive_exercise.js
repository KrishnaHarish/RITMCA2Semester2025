Create a React functional component called DriveManager that simulates a simple file drive/storage system. The component should allow users to upload files (simulated), display a list of stored files, and provide options to view file details, download (simulated), and delete files. Use useState to manage the file list and implement the following features:
1. Add new files with name, size, and type
2. Display files in a grid/list format  
3. Show file icons based on file type
4. Include file operations (view details, download, delete)
5. Use inline CSS for styling with a clean, modern interface

import React, { useState } from 'react';

function DriveManager() {
  const [files, setFiles] = useState([
    { id: 1, name: 'document.pdf', size: '2.5 MB', type: 'pdf', uploadDate: '2024-01-15' },
    { id: 2, name: 'image.jpg', size: '1.2 MB', type: 'image', uploadDate: '2024-01-16' },
    { id: 3, name: 'presentation.pptx', size: '5.8 MB', type: 'presentation', uploadDate: '2024-01-17' }
  ]);
  
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'presentation': return '📊';
      case 'document': return '📝';
      default: return '📁';
    }
  };

  const addFile = () => {
    if (newFileName.trim()) {
      const newFile = {
        id: Date.now(),
        name: newFileName,
        size: (Math.random() * 5 + 0.1).toFixed(1) + ' MB',
        type: 'document',
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setFiles([...files, newFile]);
      setNewFileName('');
    }
  };

  const deleteFile = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
  };

  const viewFileDetails = (file) => {
    setSelectedFile(file);
  };

  const downloadFile = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  const containerStyle = {
    // Add your CSS styles here
  };

  const headerStyle = {
    // Add your CSS styles here
  };

  const uploadSectionStyle = {
    // Add your CSS styles here
  };

  const inputStyle = {
    // Add your CSS styles here
  };

  const buttonStyle = {
    // Add your CSS styles here
  };

  const filesGridStyle = {
    // Add your CSS styles here
  };

  const fileCardStyle = {
    // Add your CSS styles here
  };

  const fileHeaderStyle = {
    // Add your CSS styles here
  };

  const fileIconStyle = {
    // Add your CSS styles here
  };

  const fileNameStyle = {
    // Add your CSS styles here
  };

  const fileInfoStyle = {
    // Add your CSS styles here
  };

  const fileActionsStyle = {
    // Add your CSS styles here
  };

  const actionButtonStyle = {
    // Add your CSS styles here
  };

  const detailsStyle = {
    // Add your CSS styles here
  };

  <div style={containerStyle}>
    <h1 style={headerStyle}>My Drive Manager</h1>
    
    <div style={uploadSectionStyle}>
      <h3>Upload New File</h3>
      <input
        type="text"
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
        placeholder="Enter file name..."
        style={inputStyle}
      />
      <button onClick={addFile} style={buttonStyle}>
        Add File
      </button>
    </div>

    <div style={filesGridStyle}>
      {files.map(file => (
        <div key={file.id} style={fileCardStyle}>
          <div style={fileHeaderStyle}>
            <span style={fileIconStyle}>{getFileIcon(file.type)}</span>
            <span style={fileNameStyle}>{file.name}</span>
          </div>
          <div style={fileInfoStyle}>
            Size: {file.size}<br/>
            Uploaded: {file.uploadDate}
          </div>
          <div style={fileActionsStyle}>
            <button
              onClick={() => viewFileDetails(file)}
              style={{...actionButtonStyle, backgroundColor: '#28a745', color: '#fff'}}
            >
              Details
            </button>
            <button
              onClick={() => downloadFile(file.name)}
              style={{...actionButtonStyle, backgroundColor: '#17a2b8', color: '#fff'}}
            >
              Download
            </button>
            <button
              onClick={() => deleteFile(file.id)}
              style={{...actionButtonStyle, backgroundColor: '#dc3545', color: '#fff'}}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {selectedFile && (
      <div style={detailsStyle}>
        <h3>File Details</h3>
        <p><strong>Name:</strong> {selectedFile.name}</p>
        <p><strong>Size:</strong> {selectedFile.size}</p>
        <p><strong>Type:</strong> {selectedFile.type}</p>
        <p><strong>Upload Date:</strong> {selectedFile.uploadDate}</p>
        <button 
          onClick={() => setSelectedFile(null)}
          style={{...buttonStyle, backgroundColor: '#6c757d'}}
        >
          Close Details
        </button>
      </div>
    )}
  </div>
  );
}

export default DriveManager;

// Exercise 2: Create a file search and filter component
Create a React component called FileSearchFilter that allows users to search files by name and filter by file type. Integrate this with the DriveManager component above.

import React, { useState } from 'react';

function FileSearchFilter({ files, onFilteredFiles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const searchInputStyle = {
    // Add your CSS styles here
  };

  const filterSelectStyle = {
    // Add your CSS styles here
  };

  const filterContainerStyle = {
    // Add your CSS styles here
  };

  // Filter logic implementation needed here

  <div style={filterContainerStyle}>
    <input
      type="text"
      placeholder="Search files..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={searchInputStyle}
    />
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      style={filterSelectStyle}
    >
      <option value="all">All Files</option>
      <option value="pdf">PDF Files</option>
      <option value="image">Images</option>
      <option value="presentation">Presentations</option>
      <option value="document">Documents</option>
    </select>
  </div>
  );
}

export default FileSearchFilter;