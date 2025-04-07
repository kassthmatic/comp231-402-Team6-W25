router.post('/save-filament/:filamentId', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const filamentId = req.params.filamentId;
  
      if (!user.savedFilaments.includes(filamentId)) {
        user.savedFilaments.push(filamentId);
        await user.save();
      }
  
      res.status(200).json({ message: 'Filament saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error saving filament' });
    }
  });

  router.delete('/unsave-filament/:filamentId', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const filamentId = req.params.filamentId;
  
      user.savedFilaments = user.savedFilaments.filter(id => id.toString() !== filamentId);
      await user.save();
  
      res.status(200).json({ message: 'Filament removed from favorites' });
    } catch (err) {
      res.status(500).json({ error: 'Error removing filament' });
    }
  });