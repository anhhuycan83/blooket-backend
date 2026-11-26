import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const dataDir = process.env.DATA_DIR || path.join(__dirname, '../data');

function getPackageVersion(): string {
  try {
    const pkgPath = path.join(__dirname, '../package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      return pkg.version || '1.0.0';
    }
  } catch {
    // ignore
  }
  return '1.0.0';
}

function getCurriculumMeta(): { backendVersion: string; lastUpdated?: string } {
  const pkgVer = getPackageVersion();
  try {
    const treePath = path.join(dataDir, 'curriculum_tree.json');
    if (fs.existsSync(treePath)) {
      const tree = JSON.parse(fs.readFileSync(treePath, 'utf-8'));
      return {
        backendVersion: tree.backendVersion || pkgVer,
        lastUpdated: tree.lastUpdated,
      };
    }
  } catch {
    // ignore
  }
  return { backendVersion: pkgVer };
}

// Enable CORS for public frontend requests (Web, Android, iOS)
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/v1/health', (_req: Request, res: Response) => {
  const meta = getCurriculumMeta();
  res.json({
    status: 'ok',
    version: getPackageVersion(),
    backendVersion: meta.backendVersion,
    lastUpdated: meta.lastUpdated || null,
    timestamp: new Date().toISOString(),
    service: 'Blooket Curriculum Backend API',
  });
});

// Get Curriculum Tree (Grades & Subjects)
app.get('/api/v1/curriculum/tree', (_req: Request, res: Response) => {
  const filePath = path.join(dataDir, 'curriculum_tree.json');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Curriculum tree not found' });
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.backendVersion) {
    content.backendVersion = getPackageVersion();
  }
  return res.json(content);
});

// Get specific lesson data by query params or id
app.get('/api/v1/lessons', (req: Request, res: Response) => {
  const { grade, subject, week } = req.query;
  if (grade === undefined || grade === '' || !subject || !week) {
    return res.status(400).json({ error: 'Missing required parameters: grade, subject, week' });
  }

  const filename = `g${grade}_${subject}_w${week}.json`;
  const filePath = path.join(dataDir, 'lessons', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      error: `Lesson data for Grade ${grade}, Subject ${subject}, Week ${week} not found`,
    });
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return res.json(content);
});

app.get('/api/v1/lessons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const filename = `${id}.json`;
  const filePath = path.join(dataDir, 'lessons', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Lesson ${id} not found` });
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return res.json(content);
});

// Start HTTP server
app.listen(port, () => {
  console.log(`🚀 Blooket Curriculum Backend running at http://0.0.0.0:${port}`);
  console.log(`📁 Serving data from: ${dataDir}`);
});
